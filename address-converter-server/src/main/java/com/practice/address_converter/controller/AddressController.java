package com.practice.address_converter.controller;

import com.practice.address_converter.dto.AddressResponseDto;
import com.practice.address_converter.service.AddressService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping("/convert-address")
    public ResponseEntity<AddressResponseDto> convertAddress(@RequestParam String input) {
        return addressService.convertAddress(input)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }

    @GetMapping("/suggestions")
    public List<String> getSuggestions(@RequestParam String input) {
        return addressService.getSuggestions(input);
    }

    @GetMapping("/convert-coord")
    public ResponseEntity<AddressResponseDto> convertByCoord(
            @RequestParam String lat,
            @RequestParam String lng) {
        return addressService.convertByCoord(lat, lng)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }

}
