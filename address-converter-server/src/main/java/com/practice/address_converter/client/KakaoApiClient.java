package com.practice.address_converter.client;

import com.practice.address_converter.model.*;
import com.practice.address_converter.model.KakaoApiClient.CoordToAddressDoc;
import com.practice.address_converter.model.KakaoApiClient.CoordToAddressResponse;
import com.practice.address_converter.dto.AddressResponseDto;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
public class KakaoApiClient {

    private final WebClient webClient;
    private final String kakaoApiKey;

    public KakaoApiClient(WebClient webClient, @Value("${kakao.rest-api-key}") String kakaoApiKey) {
        this.webClient = webClient;
        this.kakaoApiKey = kakaoApiKey;
    }

    public KakaoApiResponse searchAddressRaw(String input) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .scheme("https")
                        .host("dapi.kakao.com")
                        .path("/v2/local/search/address.json")
                        .queryParam("query", input)
                        .build())
                .header("Authorization", "KakaoAK " + kakaoApiKey)
                .retrieve()
                .bodyToMono(KakaoApiResponse.class)
                .block();
    }

    public Optional<AddressResponseDto> searchAddress(String query) {
        KakaoApiResponse apiResponse = searchAddressRaw(query);

        if (apiResponse == null || apiResponse.documents().isEmpty()) {
            return Optional.empty();
        }

        KakaoDocument doc = apiResponse.documents().get(0);

        return Optional.of(AddressResponseDto.from(doc));
    }

    public Optional<AddressResponseDto> searchAddressByCoord(String lat, String lng) {
        CoordToAddressResponse response = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .scheme("https")
                        .host("dapi.kakao.com")
                        .path("/v2/local/geo/coord2address.json")
                        .queryParam("x", lng)
                        .queryParam("y", lat)
                        .build())
                .header("Authorization", "KakaoAK " + kakaoApiKey)
                .retrieve()
                .bodyToMono(CoordToAddressResponse.class)
                .block();

        if (response == null || response.documents().isEmpty()) {
            return Optional.empty();
        }

        CoordToAddressDoc doc = response.documents().get(0);
        RoadAddress road = doc.roadAddress();
        Address address = doc.address();

        return Optional.of(new AddressResponseDto(
                road != null ? road.addressName() : "",
                address != null ? address.addressName() : "",
                lng,
                lat));
    }

}
