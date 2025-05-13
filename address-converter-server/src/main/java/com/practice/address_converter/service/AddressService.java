package com.practice.address_converter.service;

import com.practice.address_converter.client.KakaoApiClient;
import com.practice.address_converter.dto.AddressResponseDto;
import com.practice.address_converter.model.KakaoApiResponse;
import com.practice.address_converter.model.KakaoDocument;
import com.practice.address_converter.model.Address;
import com.practice.address_converter.model.RoadAddress;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressService {

    private final KakaoApiClient kakaoApiClient;

    public AddressService(KakaoApiClient kakaoApiClient) {
        this.kakaoApiClient = kakaoApiClient;
    }

    public Optional<AddressResponseDto> convertAddress(String input) {
        return kakaoApiClient.searchAddress(input);
    }

    public List<String> getSuggestions(String input) {
        KakaoApiResponse response = kakaoApiClient.searchAddressRaw(input);

        return response.documents().stream()
                .map(this::extractAddressName)
                .toList();
    }

    public Optional<AddressResponseDto> convertByCoord(String lat, String lng) {
        return kakaoApiClient.searchAddressByCoord(lat, lng);
    }

    private String extractAddressName(KakaoDocument doc) {
        RoadAddress road = doc.roadAddress();
        Address addr = doc.address();
        return road != null ? road.addressName() : addr.addressName();
    }
}
