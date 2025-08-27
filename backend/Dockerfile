# -------- Stage 1: build with Maven (JDK 17) --------
FROM maven:3.9.8-eclipse-temurin-17 AS build
WORKDIR /app

# Copy only pom first to warm the cache
COPY pom.xml .
RUN mvn -q -DskipTests dependency:go-offline

# Now copy sources and build
COPY src ./src
RUN mvn -q -DskipTests package

# -------- Stage 2: run on JRE 17 (smaller image) --------
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy the fat jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Render sets $PORT; Spring uses it (server.port=${PORT:8080})
ENV PORT=8080
EXPOSE 8080

CMD ["sh", "-c", "java -jar app.jar"]
