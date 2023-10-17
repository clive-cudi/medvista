### doctor table row onclick()
 - should show additional doctor information plus operations to be done on the selected doctor
 - should open a modal with additional information on the doctor:
 	- Name
	- Specialty
	- location
	- phone
	- email
	- profile pic
	- + alter operations
 - necessary operations:
 	- Archive a doctor
	- remove a doctor
	- revoke medical glimpse approval


#### demo recording
- the app has two major views => doctor side and patient side
- auth
    - registration
    - email verification
    - validation of fields
    - login
- appointments
    - patients booking appointments based on time slots available
    - patient can't book an already occupied appointment time slot
    - doctors who've been booked for an appointment are automatically given view access to the patient's records
