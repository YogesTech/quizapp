# Use JDK 17
FROM eclipse-temurin:17-jdk

# Work inside /app
WORKDIR /app

# Copy backend code into the image
COPY . .

# If you DON'T have Maven Wrapper committed, install Maven in the image:
RUN apt-get update && apt-get install -y maven

# Build the jar (skip tests for speed)
RUN mvn -q -DskipTests package

# Render injects PORT; we already have server.port=${PORT:8080} in properties
EXPOSE 8080

# Run the app
CMD ["sh", "-c", "java -jar target/*.jar"]
