package com.practice.address_converter.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Address(
    @JsonProperty("address_name") String addressName,
    String x,
    String y
) {}
