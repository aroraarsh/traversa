from flask import Flask, request, jsonify
import openai
from dotenv import load_dotenv
import os

# Initialize Flask app
app = Flask(__name__)

load_dotenv()

openai.api_key = os.getenv("REACT_APP_API_KEY")

# Initialize Flask app
app = Flask(__name__)

@app.route('/generate-itinerary', methods=['POST'])
def generate_itinerary():
    # Extract user input from the request
    data = request.json
    destination = data['destination']
    family = data['family']
    alcohol = data['alcohol']
    hotel_location = data['hotel_location']
    food_choices = data['food_choices']
    extra_details = data['extra_details']
    number_of_days = data['number_of_days']
    arrival_date = data['arrival_date']
    departure_date = data['departure_date']

    prompt = f"Please generate a very detailed {number_of_days}-day itinerary for {destination} with the following details:\n" \
             f"Arrival Date: {arrival_date}\n" \
             f"Departure Date: {departure_date}\n" \
             f"Family: {family}\n" \
             f"Alcohol: {alcohol}\n" \
             f"Hotel Location: {hotel_location}\n" \
             f"Food Choices: {food_choices}\n" \
             f"Extra Details: {extra_details}"

    print(prompt)

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant giving detailed itinerary details. Please include timestamps for activities, also keep in mind the likely weather that they will experience. Also, don't just say restaurant, cafe, church etc. Be specific and give some options." },
            {"role": "user", "content": prompt}
        ]
    )

    itinerary = completion.choices[0].message['content']

    # Return the generated itinerary as a JSON response
    return jsonify({'itinerary': itinerary})


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)