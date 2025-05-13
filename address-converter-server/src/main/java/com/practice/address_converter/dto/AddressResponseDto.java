package com.practice.address_converter.dto;

import com.practice.address_converter.model.Address;
import com.practice.address_converter.model.KakaoDocument;
import com.practice.address_converter.model.RoadAddress;

public record AddressResponseDto(
        String roadAddress,
        String jibunAddress,
        String longitude,
        String latitude) {
    public static AddressResponseDto from(KakaoDocument doc) {
        RoadAddress road = doc.roadAddress();
        Address addr = doc.address();

        return new AddressResponseDto(
                road != null ? road.addressName() : "",
                addr != null ? addr.addressName() : "",
                addr != null ? addr.x() : "",
                addr != null ? addr.y() : "");
    }
}
