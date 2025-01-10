package com.synclab.recelog_b.service;

import com.synclab.recelog_b.entity.Setup;
import com.synclab.recelog_b.exception.SetupException;
import com.synclab.recelog_b.repository.SetupRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SetupService {
    @Autowired
    SetupRepo setupRepo;

    @Transactional
    public void addSetup(String username,String lap, String track,String car, int type, String setup) throws SetupException {
        if(getSetup(username,track,car,type)!= null)
            setupRepo.updateSetup(setup,lap, username,track,car, type);
        else
            setupRepo.save(new Setup(0,username,track,car,lap,type,setup));
    }
    public String getSetup(String username,String track,String car, int type){
        return this.setupRepo.getSetup(username,track,car,type);
    }


}
