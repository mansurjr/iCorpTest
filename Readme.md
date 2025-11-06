# Interview API Demo

This project demonstrates how to interact with a test API (`https://test.icorp.uz/interview.php`) using **Express**, **Axios**, and **Swagger**. The workflow covers sending a POST request, receiving a callback, concatenating codes, and verifying the result.

---

## Features

- Sends an initial message to the test API (`POST /start`)
- Receives the second part of the code via callback (`POST /callback`)
- Concatenates both parts of the code and performs a GET request to verify
- Fully documented using **Swagger UI** at `/api-docs`

---

## Requirements

- Node.js v18+
- npm or yarn
- Publicly accessible server for the callback URL (your server IP is `18.158.178.73`)

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/mansurjr/iCorpTest
cd iCorpTest