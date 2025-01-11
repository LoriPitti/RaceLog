package com.synclab.recelog_b;

import com.fasterxml.jackson.databind.annotation.JsonAppend;
import com.synclab.recelog_b.cotroller.controllers.*;
import com.synclab.recelog_b.entity.Track;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ReceLogBApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReceLogBApplication.class, args);
	}
	@Autowired
	CarController carController;
	@Autowired
	AdminController adminController;
	@Autowired
	RecordController recordController;
	@Autowired
	SetupController setupController;
	@Autowired
	TrackController trackController;
	@Autowired
	UserController userController;
}
