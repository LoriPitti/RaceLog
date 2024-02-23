package com.synclab.recelog_b;

import com.synclab.recelog_b.cotroller.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ReceLogBApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReceLogBApplication.class, args);
	}
	@Autowired
	Controller controller;
}
