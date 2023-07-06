import os
print('Get current working directory : ', os.getcwd())

from pathlib import Path

p = Path(__file__).parents[1]

print(p)