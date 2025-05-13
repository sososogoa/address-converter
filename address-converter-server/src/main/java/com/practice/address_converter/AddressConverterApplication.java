package com.practice.address_converter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan("com.practice.address_converter.config")
public class AddressConverterApplication {

	public static void main(String[] args) {
		SpringApplication.run(AddressConverterApplication.class, args);
	}

}
