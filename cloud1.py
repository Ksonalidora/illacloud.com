# Constants for the speed of sound in meters per second (at sea level and 20 degrees Celsius)
SPEED_OF_SOUND = 343  # Approximately 343 m/s

def calculate_distance_to_lightning(time_in_seconds):
    # Calculate the distance to the lightning strike based on the time delay
    distance = SPEED_OF_SOUND * time_in_seconds
    return distance

def main():
    try:
        time_delay = float(input("Enter the time delay between lightning and thunder (in seconds): "))
        distance = calculate_distance_to_lightning(time_delay)
        print(f"The lightning strike is approximately {distance} meters away.")
    except ValueError:
        print("Invalid input. Please enter a valid time delay in seconds.")

if __name__ == "__main__":
    main()
