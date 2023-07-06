import os


import os
print('Get current working directory : ', os.getcwd())

'''
'''
def sh(script):
    os.system("bash -c '%s'" % script)

    
sh("pwd")
sh("python3 chatgpt.py")
sh("python3 narakeet.py")
sh("node mid2.js")
sh("python3 import_bucket.py")
sh("python3 data_to_video.py" )
os.chdir("/Users/yannfurrer/Documents/Github/Tiktok_algo/video/my-video") 
print(os.getcwd())

sh("npm start")