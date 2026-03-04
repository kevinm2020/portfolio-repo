# Stage 1: Build
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app
COPY pom.xml .
COPY src ./src

# Build the Spring Boot JAR
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy the JAR from build stage to /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENV PORT=8080

# Run the backend using the correct path
ENTRYPOINT ["sh", "-c", "java -jar /app/app.jar --server.port=$PORT"]