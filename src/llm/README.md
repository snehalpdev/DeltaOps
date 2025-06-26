# Local LLM Setup (Ollama + Mistral)

# Step 1: Build the base image
docker build -t strategist-ollama .

# Step 2: Run the container
docker run -it --name strategist-ollama -p 11434:11434 ollama/ollama

# Step 3: Pull mistral inside the running container
docker exec strategist-ollama ollama pull mistral

# Step 4 (optional): Commit the container as a fresh image with mistral baked in
docker commit strategist-ollama strategist-ollama-mistral
docker save strategist-ollama-mistral > strategist-ollama.tar

## 1. Load Prebuilt Image
```bash
docker load -i strategist-ollama.tar

2. Run the Container
docker run -d -p 11434:11434 --name strategist strategist-ollama-mistral

3. Test the API
curl http://localhost:11434/api/generate -d '{"model":"mistral","prompt":"Suggest a neutral options strategy"}'
