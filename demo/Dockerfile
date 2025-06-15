# Use a base image with JDK 17 (Java Development Kit)
FROM eclipse-temurin:17-jdk-jammy

# Set the working directory inside the container
WORKDIR /app

# Copy the entire Spring Boot project into the container
# This includes source code, pom.xml, mvnw, etc.
COPY . .

# Build the Spring Boot application into a JAR file
# -DskipTests is added to speed up the build for simplicity.
# In a real CI/CD, you'd run tests separately.
RUN ./mvnw package -DskipTests

# Expose the port your Spring Boot application runs on (default is 8080)
EXPOSE 8080

# Define the command to run the application when the container starts
# The `ls -t target/*.jar | head -n1` finds the most recently built JAR
ENTRYPOINT ["sh", "-c", "java -jar $(ls /app/target/*.jar | head -n 1)"]
