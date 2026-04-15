# Address Converter

카카오 API를 활용한 한국 주소 변환 도구입니다.
텍스트 검색 및 지도 좌표를 통해 지번/도로명 주소 간 변환을 지원합니다.

## Stack

- **Server**: Spring Boot 3 + Spring WebFlux (Java 17)
- **Client**: React 19 + TypeScript + Tailwind CSS + Vite
- **API**: Kakao Maps API

## Structure

```
address-converter-server/   # Spring Boot REST API
address-converter-client/   # React 프론트엔드
```

## Getting Started

**Server**
```bash
cd address-converter-server
KAKAO_API_KEY=your_key ./gradlew bootRun
```

**Client**
```bash
cd address-converter-client
npm install
npm run dev
```

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/convert-address` | 주소 텍스트 → 좌표 변환 |
| GET | `/api/suggestions` | 주소 자동완성 |
| GET | `/api/convert-coord` | 좌표 → 주소 역변환 |