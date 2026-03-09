# Configuration Setup Instructions

Before starting the application, you must load the configuration files in this directory into your Redis instance. These configuration files are required for the app to function correctly.

## Steps to Load Configurations into Redis

1. **Ensure Redis is running** on your system or server.
2. **Load each configuration file** into Redis using the following command format:

   ```bash
   redis-cli -h <REDIS_HOST> -p <REDIS_PORT> set <KEY_NAME> "$(cat <CONFIG_FILE>)"
   ```

   - Replace `<REDIS_HOST>` and `<REDIS_PORT>` with your Redis server details.
   - Replace `<KEY_NAME>` with the desired Redis key (e.g., `app-config`, `widget-config`, etc.).
   - Replace `<CONFIG_FILE>` with the path to the configuration file (e.g., `app-config.json`).

   **Example:**

   ```bash
   redis-cli set app-config "$(cat app-config.json)"
   ```

3. **Repeat** for each configuration file in this directory.

## List of Configuration Files

- app-config.json
- chat-system-instruction.md
- expesnse-category-config.json
- open-source-config.json
- solution-config.json
- summarizer-system-instruction.md
- taxadvisor-system-instruction.md
- widget-config.json

> **Note:** Ensure the contents of each file are valid and properly formatted before loading into Redis.

Once all configuration files are loaded, you can start the application as usual.
