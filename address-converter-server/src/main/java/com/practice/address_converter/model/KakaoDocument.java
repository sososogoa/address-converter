package com.practice.address_converter.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record KakaoDocument(
    @JsonProperty("road_address") RoadAddress roadAddress,
    Address address
) {}
