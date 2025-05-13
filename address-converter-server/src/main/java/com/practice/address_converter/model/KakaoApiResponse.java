package com.practice.address_converter.model;

import java.util.List;

public record KakaoApiResponse(
    List<KakaoDocument> documents
) {}