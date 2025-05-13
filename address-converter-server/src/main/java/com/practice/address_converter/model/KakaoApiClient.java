package com.practice.address_converter.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

public class KakaoApiClient {
    public record CoordToAddressResponse(
            List<CoordToAddressDoc> documents) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record CoordToAddressDoc(
            @JsonProperty("road_address") RoadAddress roadAddress,
            Address address) {
    }

}
