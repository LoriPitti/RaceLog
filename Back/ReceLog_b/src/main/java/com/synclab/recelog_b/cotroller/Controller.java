package com.synclab.recelog_b.cotroller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.tools.jconsole.JConsoleContext;
import com.synclab.recelog_b.entity.*;
import com.synclab.recelog_b.exception.RecordException;
import com.synclab.recelog_b.exception.SetupException;
import com.synclab.recelog_b.exception.TrackException;
import com.synclab.recelog_b.exception.UserException;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import com.synclab.recelog_b.service.Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class Controller {
    private ObjectMapper objectMapper;
    @Autowired
    Service service;


    //------------------------------------------USER SECTION-------------------------------------------------------------
    @GetMapping("/users")
    public String getAllUsers() {
        try {
            return toJson(service.getAllUsers());
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        }
    }
    @GetMapping("/user") //TODO-- > farlo solo se loggato (spring security)
    public String getUserData(@RequestParam("username")String username) {
        try {
            return toJson(service.getUserData(username));
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        }
    }

    @GetMapping("/usernames")
    public String geAllUsernames() {
        try {
            return toJson(service.getAllUsernames());
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        }
    }

    @PostMapping("/user/login")
    public String logIn(@RequestBody String json) {
        objectMapper = new ObjectMapper();
        try {
            LogData logData = objectMapper.readValue(json, LogData.class);

            return toJson(service.login(logData.username(), logData.password()));

        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        } catch (UserException e) {
            switch (e.getMessage()) {
                case "noFound":
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "L' utente non esiste");
                case "pswWrong":
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La password è errata, riprovare"); //TODO understand which status send
                default:
                    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore sconosciuto");
            }
        }
    }

    @PostMapping("user/signup")
    public String signUp(@RequestBody String json) {
        objectMapper = new ObjectMapper();
        User user = null;  //TODO --> merge parsing method
        UserObj userObj = null;
        try {
            userObj = objectMapper.readValue(json, UserObj.class);
            user = objectMapper.readValue(userObj.user(), User.class);

        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");

        }
        if (service.isUsernameExists(user.getUsername())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "L' utente esiste già");
        }
        if (service.signUpUser(user)) {
            MessageResponse response = new MessageResponse("Utente Registrato");
            try {
                return toJson(response);
            } catch (JsonProcessingException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
            }
        } else
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore sconosciuto");

    }

    @DeleteMapping("user/delete")
    public ResponseEntity<Integer> deleteUser(@RequestParam("username") String username) {
        try {
            service.deleteByUsername(username);
            return ResponseEntity.ok(200);
        } catch (UserException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/user/update")
    public ResponseEntity<Integer> updateUser(@RequestParam("username")String username,
                                              @RequestParam("name")String name,
                                              @RequestParam("lastname")String lastname,
                                              @RequestParam("email")String email,
                                              @RequestParam("password") String password) {
        try {
            service.updateUser(username, name, lastname, email, password);
            return  ResponseEntity.ok(200);
        } catch (UserException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    //----------------------------USER RECORD SECTION----
    @GetMapping("user/records/get")
    public String getUserRecords(@RequestParam("username")String username,@RequestParam("type") String type)  {
        if(type.equals("dry")){
            try {
                return toJson(service.getUserDryRecord(username));

            } catch (UserException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "L' utente non esiste");

            } catch (JsonProcessingException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
            }
        }else if(type.equals("wet")){
            try {
                //call the service
                return toJson(service.getUserWetRecord(username));

            } catch (UserException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "L' utente non esiste");
            } catch (JsonProcessingException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
            }

        }else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "tipo invalido");
    }
    @PostMapping("user/records/dry/post")
    public ResponseEntity<Integer> insertUserDryRecord(@RequestBody String json){
        objectMapper = new ObjectMapper();
        try {
            Dry_record dry_record = objectMapper.readValue(json, Dry_record.class);
            System.out.println(dry_record.getUsername());
            service.insertNewDryRecord(dry_record);
            return ResponseEntity.ok(200);
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        } catch (Exception e) {
            throw  new ResponseStatusException(HttpStatus.BAD_REQUEST, "Il record è gia inserito");
        }
    }
    @PostMapping("user/records/wet/post")
    public ResponseEntity<Integer> insertUserWetRecord(@RequestBody String json){
        objectMapper = new ObjectMapper();
        try {
            Wet_record wet_record = objectMapper.readValue(json, Wet_record.class);
            service.insertNewWetRecord(wet_record);
            return ResponseEntity.ok(200);
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        } catch (Exception e) {
            throw  new ResponseStatusException(HttpStatus.BAD_REQUEST, "Il record è gia inserito");
        }
    }
    @DeleteMapping("user/records/dry/delete")
    public ResponseEntity<Integer> deleteDryRecord(@RequestBody String json) {
        objectMapper = new ObjectMapper();
        try {
            Dry_record dry_record = objectMapper.readValue(json, Dry_record.class);
            service.deleteRecord(dry_record.getUsername(), dry_record.getTrack(), dry_record.getCar(), dry_record.getTime(), "dry");
            return ResponseEntity.ok(200);
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");

        } catch (RecordException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Il record non esiste");
        }
    }
    @DeleteMapping("user/records/wet/delete")
    public ResponseEntity<Integer> deleteWetRecord(@RequestBody String json) {
        objectMapper = new ObjectMapper();
        try {
            Dry_record dry_record = objectMapper.readValue(json, Dry_record.class);
            service.deleteRecord(dry_record.getUsername(), dry_record.getTrack(), dry_record.getCar(), dry_record.getTime(), "wet");
            return ResponseEntity.ok(200);
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");

        } catch (RecordException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Il record non esiste");
        }
    }

    @GetMapping("user/records/times")
    public String getTimesByTrack(@RequestParam("username") String username, @RequestParam("track") String track, @RequestParam String type){
        try {
            return toJson(service.getTimesByTrack(username, track, type));
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error while parsing to json");
        }

    }

    @GetMapping("user/records/tracks")
    public List<String> getUsersTrack(@RequestParam("username") String username,
                                @RequestParam("type")String type){
        if(!type.equals("dry") && !type.equals("wet"))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"type not supported");

        return service.getTracksForUser(username, type);
    }



        // --------------------------------------------ADMIN SECTION----------------------------------------------------
    @PostMapping("/admin/track/load")
    public ResponseEntity<Integer> insertNewTrack(
            @RequestParam("name") String name,
            @RequestParam("country") String country,
            @RequestParam("imgBack") MultipartFile imgBack,
            @RequestParam("imgFront") MultipartFile imgFront,
            @RequestParam("length") int length,
            @RequestParam("cornerL") int cornerL,
            @RequestParam("cornerR") int cornerR
    ) {
        System.out.println("riceuto");
        byte[] imgBackContent;
        byte[] imgFrontContent;
        if (imgBack.isEmpty() || imgFront.isEmpty()) {
            System.out.println("file vuoti");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "I file immagine non possono essere vuoti");
        }
        try {
            imgBackContent = imgBack.getBytes();
            imgFrontContent = imgFront.getBytes();
        } catch (IOException e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nella lettura dei file");
        }
        service.insertNewTrack(new Track(1,name, country,imgBackContent, imgFrontContent, length, cornerL, cornerR));
        return ResponseEntity.ok(200);
    }
    @PostMapping("/admin/car/load")
    public ResponseEntity<Integer> insertNewCar(
            @RequestParam("name") String name,
            @RequestParam("brand") String brand,
            @RequestParam("imgBack") MultipartFile imgBack,
            @RequestParam("imgFront") MultipartFile imgFront,
            @RequestParam("year") int year
    ) {
        byte[] imgBackContent;
        byte[] imgFrontContent;
        if (imgBack.isEmpty() || imgFront.isEmpty()) {
            System.out.println("file vuoti");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "I file immagine non possono essere vuoti");
        }
        try {
            imgBackContent = imgBack.getBytes();
            imgFrontContent = imgFront.getBytes();
        } catch (IOException e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nella lettura dei file");
        }
        service.insertNewCar(new Car(1,name, brand,imgBackContent, imgFrontContent, year));
        return ResponseEntity.ok(200);
    }



    //-------------------------------------------- TRACK SECTION ----------------------------------------------------------
    @GetMapping("/tracks")
    public String getAllTracks(){
        try {
            List<Track> tracks = service.getAllTracks();
            List<TrackData> trackData = new ArrayList<>();
            tracks.forEach(track -> {
                    trackData.add(new TrackData(track.getName(), track.getCountry(),
                            Base64.getEncoder().encodeToString(track.getImgBack()),
                            Base64.getEncoder().encodeToString(track.getImgFront()),
                            String.valueOf(track.getLength()), String.valueOf(track.getCornerL()), String.valueOf(track.getCornerR())));
            });
            return toJson(trackData);

        } catch (JsonProcessingException e) {
           throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        }
    }

    @GetMapping("/tracksname")
    public String getAllTracksName(){
        try {
            return toJson(service.getAllTracksName());
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        }
    }

    @GetMapping("/track/{name}")
    public String getTrackByName(@PathVariable String name)  {
        Track track = null;
        try {
            track = service.getTrackByName(name);
        } catch (TrackException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La pista non è stata inserita nel database");
        }
        byte[] imgBack= track.getImgBack();
        byte[] imgFront= track.getImgFront();
//        return "{\"img\" : \""+Base64.getEncoder().encodeToString(imgBack)+"\"}";
        return "{\"name\":\""+track.getName() + "\"," +
                "\"country\" : \""+track.getCountry() + "\"," +
                "\"imgBack\" : \"" +Base64.getEncoder().encodeToString(imgBack)+"\"," +
                "\"imgFront\" : \""+Base64.getEncoder().encodeToString(imgFront)+"\"," +
                "\"length\" : \""+track.getLength() + "\"," +
                "\"cornerL\" : \""+track.getCornerL() +"\","+
                "\"cornerR\" : \"" +track.getCornerR()+"\"}";
    }

    @GetMapping("/track/cars")
    public String getCarsByTrack(@RequestParam("username") String username, @RequestParam("track") String track, @RequestParam("type") String type){
        if(!type.equals("wet") && !type.equals("dry")){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "type not supported");
        }
        try {
            return toJson(service.getCarsByTrack(username,track, type));
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "error while parsing json");
        }

    }

    private String toJson(Object obj) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(obj);
    }

    //-----------------------------------------CAR SECTION---------------------------------------------------------
    @GetMapping("/carsname")
    public String getAllCarsName(){
        try {
            return toJson(service.getAllCarsName());
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        }
    }
    @GetMapping("/cars")
    public String getAllCars(){
        try {
            List<Car> cars = service.getAllCars();
            List<CarData> carsData = new ArrayList<>();
            cars.forEach(car -> {
                carsData.add(new CarData(car.getName(), car.getBrand(),
                        Base64.getEncoder().encodeToString(car.getImgBack()),
                        Base64.getEncoder().encodeToString(car.getImgFront()),
                        String.valueOf(car.getYear())));
            });
            return toJson(carsData);

        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        }
    }
    @GetMapping("/car/{name}")
    public String getCarByName(@PathVariable String name)  {
        Car car = null;
        try {
            car = service.getCarByName(name);
        } catch (TrackException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La vettura non è stata inserita nel database");
        }
        byte[] imgBack= car.getImgBack();
        byte[] imgFront= car.getImgFront();
        return "{\"name\":\""+car.getName() + "\"," +
                "\"brand\" : \""+car.getBrand() + "\"," +
                "\"imgBack\" : \"" +Base64.getEncoder().encodeToString(imgBack)+"\"," +
                "\"imgFront\" : \""+Base64.getEncoder().encodeToString(imgFront)+"\"," +
                "\"year\" : \"" +car.getYear()+"\"}";
    }
    //------------------------------------------SETUP
    @GetMapping("setup/get")
    public String getSetup(@RequestParam("user")String username,
                           @RequestParam("track")String track,
                           @RequestParam("car")String car,
                           @RequestParam("type")int type){
        System.out.println("Get request");
        return  service.getSetup(username,track,car,type);

    }
    @PostMapping("setup/post")
    public ResponseEntity<Integer> saveSetup(@RequestBody String setup, @RequestParam("username")String username,
                                             @RequestParam("track")String track,
                                             @RequestParam("car")String car,
                                             @RequestParam("type")int type,
                                             @RequestParam("lap")String lap) throws JsonProcessingException, SetupException {
            service.addSetup(username,lap, track,car,type,setup);

        return ResponseEntity.ok(200);
    }
}



