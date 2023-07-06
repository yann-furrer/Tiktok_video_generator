import os



import os
from dotenv import load_dotenv

load_dotenv()

config = {
    "bingImageCookie": os.getenv("BING_IMAGE_COOKIE"),
    "tempDir": os.getenv("TEMP_DIR"),
}
