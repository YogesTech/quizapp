# -------- Stage 1: build with Maven (JDK 17) --------
FROM maven:3.9.8-eclipse-temurin-17 AS build
WORKDIR /app


COPY pom.xml .
RUN mvn -q -DskipTests dependency:go-offline

COPY src ./src
RUN mvn -q -DskipTests package

# -------- Stage 2: run on JRE 17 --------
FROM eclipse-temurin:17-jre
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

ENV PORT=8080
EXPOSE 8080

CMD ["sh", "-c", "java -jar app.jar"]
