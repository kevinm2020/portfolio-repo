# Use Maven + JDK to build and run in one stage
FROM maven:3.9.6-eclipse-temurin-21

WORKDIR /app

# Copy Maven config first (speeds up rebuilds)
COPY pom.xml .

# Copy source code
COPY src ./src

# Build the Spring Boot jar (skip tests for speed)
RUN mvn clean package -DskipTests

# Expose port (Render injects PORT environment variable)
EXPOSE 8080

# Run the jar dynamically using the only jar in target/
CMD java -jar target/*.jar