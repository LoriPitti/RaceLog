package com.synclab.recelog_b.service.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.security.*;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.Date;

@Service
public class JwtTokenService {
    private static final Logger logger = LoggerFactory.getLogger(JwtTokenService.class);

    private String privateKey = "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDS+uT3eICZgOOpVjOF51vjDDcFpDLPVEqWS4gBVu2R6pC9829OmBZM/S+i00Y23D4DzSGPCyeJ8AUjJ/Jh6kPwwHJ5onXEjf9Ak1Itf3rHnQGDy/6Yok81WwIyVEAVVr5//3bmgmyEC3qbvDd570Al1boC2RooP9Kca9NZrh6368JH21vMIIUniveSs9TWW2uzznrzR2wE2vIkGItvaHorULacT5kN9SDBMz34VlrmuFYT6HSA/DF7wugAOTUuauMsEKT8sPBOXt12aGiS1aFyzq8L1w3An+C2s68JRVzNywXh23OrJTxy3bE7aCRLnY0pQ3A7AnrQo210p5qB+NU3AgMBAAECggEAAI9l+Do7rSyobhSqglqA5fNsWfl7oQ1KPWfp7ob6jn6e78Irs3u343BwpfAFqbOf/oaW5jhTXIxklxlODXB/ya3ZH/WMdn8iBFvfxfsmqk0CagUqoeEccLnTIasTmHroepKFEEucWiVlp/Ax/YLjGracjdFhvmWc+4lVwFE0B6z5VQqncGfmpxq+keeUbkBRBM+W6TiMLSW0bOp+Mj5bhJu54+5Lbdn94tc+EBuQqK41q9OEnRLzmS03UzsmCY0N4oNymWCjfZKt6HUOOI/JO4YvxJTNPwNQt++Hau7JXRm0ASKT2gnSKj3Mkji+ggxKPqTH2VK6O10afr25iXhwYQKBgQDiSDIywAbjX9EKSdQAwQZpRsRAsrJd8kP6nCLXxK9FQ0b4bIfayGV+qqR2unvb2eFIRJrXG6CCfzQJp53WMruG5z8Hzh//8uE6h1R6tXO6Y1vvObnIOHC1SbeHx8xAzozBXMstLpUQ1DZUOao0I07HTJF5Vvk21YLVJUybxWFJzwKBgQDusDuUXITysRKuiWO/u/T64didGyA9mh7zrNyGcgAtmbOtCUFUICkH2gv6OIQI/Nl6oWpknefviJnmhAxDeJuXwWMafyLJyw6VfdgUrkqqSDX/bTrzae7UQHuiKaHeXsbw5U+PJMTWMdU/jQxQGGvEfQaSsSpJu16YieHxNUVgGQKBgB/i0ogKPS4/K0LK4n/0s0WUfkUrqSzJ3cBrzhEfmx8ketS43m/6+ypdO22rm5aAXlmDqVoUf4rEB/4wS3KKlZhN77jW1/WGMSzBMytTdGpYY/US6lYHdgJlz+HnSqX7NSRuQgcs4D6N2NYHhi9wpkI5TOqPUfDjJ1uHtQLiTnJLAoGBANWKRUNOIoMdeCE+OUdn2Jw7QZgMlKOIJvjKReDiTNZ/FAhSp2ej/hFQOjb6KOYBkG/tyUmLG91o0Icyy+XxGQKDuS4TYAQ47itAEvktlQ8S23xRNNRgiZLKvdEufep70G/kN3FQ6+jVXHsmrUVbE88OK7tBVRvxzYeak9FAX3jBAoGBAMzlXxy/Uvs6n6gaU+Isli3eRrhTY3pHz5E99ZSiLpmbSeLJx8nUmxY6TZgunOB+1Ycprw35jg5e3wpIrP99VbaSwWMd3gz1RDcHU+3iJQF3usv4hFt0ZJzO7uoidkK8PDxdZPFlkMfub+Y913p55wV4o1Vlh5oNJQciREh5aByG";
    private String publicKey  ="MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0vrk93iAmYDjqVYzhedb4ww3BaQyz1RKlkuIAVbtkeqQvfNvTpgWTP0votNGNtw+A80hjwsnifAFIyfyYepD8MByeaJ1xI3/QJNSLX96x50Bg8v+mKJPNVsCMlRAFVa+f/925oJshAt6m7w3ee9AJdW6AtkaKD/SnGvTWa4et+vCR9tbzCCFJ4r3krPU1ltrs85680dsBNryJBiLb2h6K1C2nE+ZDfUgwTM9+FZa5rhWE+h0gPwxe8LoADk1LmrjLBCk/LDwTl7ddmhoktWhcs6vC9cNwJ/gtrOvCUVczcsF4dtzqyU8ct2xO2gkS52NKUNwOwJ60KNtdKeagfjVNwIDAQAB";


    /**
     * Metodo per caricare la chiave privata
     * @param keyPem la chiave privata
     * @return la chiave privata
     */
    private PrivateKey loadPrivateKey(String keyPem) {
        try {
            // Rimuove le delimitazioni PEM
            String keyPemWithoutDelimiters = keyPem.replace("-----BEGIN RSA PRIVATE KEY-----", "").replace("-----END RSA PRIVATE KEY-----", "");

            // Decodifica la stringa PEM
            byte[] decoded = Base64.getDecoder().decode(keyPemWithoutDelimiters);

            // Carica la chiave privata
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(decoded);
            return keyFactory.generatePrivate(keySpec);
        } catch (Exception e) {
            throw new RuntimeException("Errore nel caricare la chiave privata", e);
        }
    }

    /**
     * Metodo per caricare la chiave pubblica da Base64
     * @param  keyPem la chiave pubblica in Base64
     * @return la chiave pubblica
     */
    private PublicKey loadPublicKey(String keyPem) {
        try {
            // Rimuove le delimitazioni PEM
            String keyPemWithoutDelimiters = keyPem.replace("-----BEGIN RSA PUBLIC KEY-----", "").replace("-----END RSA PUBLIC KEY-----", "");

            // Decodifica la stringa PEM
            byte[] decoded = Base64.getDecoder().decode(keyPemWithoutDelimiters);

            // Carica la chiave pubblica
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            X509EncodedKeySpec keySpec = new X509EncodedKeySpec(decoded);
            return keyFactory.generatePublic(keySpec);
        } catch (Exception e) {
            throw new RuntimeException("Errore nel caricare la chiave pubblica", e);
        }
    }

    /**
     * Metodo  per generare il  JWT
     * @param username
     * @return
     */
    public String generateToken(String username, int userType ) {
        PrivateKey pkey =  loadPrivateKey(privateKey);
        return Jwts.builder()
                .claim("sub", username)
                .claim("type", userType)
                .claim("iat", new Date())
                .claim("exp", new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(SignatureAlgorithm.RS256,  pkey) // Firma con la chiave privata
                .compact(); // Crea il JWT
    }

    /**
     * Metodo  per estarre il subject dal JWT (username)
     * @param token
     * @return
     */
    public String extractUsername(String token) {
        PublicKey pkey =  loadPublicKey(publicKey);
        JwtParser jwtParser = Jwts.parser()
                .setSigningKey(pkey)  // Imposta la chiave pubblica per la verifica
                .build();  // Crea un parser

        Claims claims = jwtParser.parseClaimsJws(token).getBody(); // Usa il parser per ottenere i claims
        return claims.getSubject();
    }

    /**
     * Metodo  per verificare se l'utente è un admin (1)
     * @param token
     * @return
     */
    public boolean isAdmin(String token) {
        PublicKey pkey =  loadPublicKey(publicKey);
        JwtParser jwtParser = Jwts.parser()
                .setSigningKey(pkey)  // Imposta la chiave pubblica per la verifica
                .build();  // Crea un parser

        Claims claims = jwtParser.parseClaimsJws(token).getBody(); // Usa il parser per ottenere i claims
        boolean b= claims.get("type", Integer.class) == 1;
        logger.info("isAdmin {}",b);
        return  b;//se 1 =  admin
    }

    public boolean validateToken(String token, String username) {
        String extractedUsername = extractUsername(token);  // Estrai il nome utente dal token
        return (extractedUsername.equals(username) && !isTokenExpired(token));  // Verifica il nome utente e se è scaduto
    }

    private boolean isTokenExpired(String token) {
        PublicKey pu = loadPublicKey(publicKey);  // Carica la chiave pubblica per la verifica della firma
        JwtParser jwtParser = Jwts.parser()
                .setSigningKey(pu)  // Imposta la chiave pubblica per la verifica
                .build();  // Costruisci il parser

        Claims claims = jwtParser.parseClaimsJws(token).getBody();  // Verifica la firma e ottieni i claims
        Date expiration = claims.getExpiration();
        return expiration.before(new Date());  // Controlla se il token è scaduto
    }

}
