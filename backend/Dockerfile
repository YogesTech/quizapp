# -------- Stage 1: build with Maven (JDK 17) --------
FROM maven:3.9.8-eclipse-temurin-17 AS build
WORKDIR /app

# Because Render's build context is the repo root, reference files under backend/
COPY backend/pom.xml ./pom.xml
RUN mvn -q -DskipTests dependency:go-offline

# Copy sources from backend/
COPY backend/src ./src
RUN mvn -q -DskipTests package

# -------- Stage 2: run on JRE 17 (smaller image) --------
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Render injects $PORT; Spring reads server.port=${PORT:8080}
ENV PORT=8080
EXPOSE 8080

CMD ["sh", "-c", "java -jar app.jar"]
