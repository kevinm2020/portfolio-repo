# Use Maven + JDK to build the Spring Boot app
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build the Spring Boot jar
RUN mvn clean package -DskipTests

# Stage 2 — runtime
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy the jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Use environment variable PORT if provided
ENV PORT=8080

# Run the jar
ENTRYPOINT ["sh", "-c", "java -jar app.jar --server.port=$PORT"]