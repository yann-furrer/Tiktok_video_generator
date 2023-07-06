from cloud import upload_blob, delete_blob, delete_bucket_content, delete_bucket, check_bucket_exist, create_bucket, bucket_name
import os 
import json
import pathlib
#import voice 
import os
import re
def sorted_alphanumeric(data):
    convert = lambda text: int(text) if text.isdigit() else text.lower()
    alphanum_key = lambda key: [ convert(c) for c in re.split('([0-9]+)', key) ] 
    return sorted(data, key=alphanum_key)
#print('getcwd:      ', os.getcwd())
#print('__file__:    ', __file__)
file_name = os.getcwd()+"/temp"
dirname = pathlib.Path(file_name)

list_bucket_folder = ["image", "subtitle",  "voice"]
count = 0



#upload_blob(bucket_name, "/Users/yannfurrer/Desktop/video/script/temp/image/image2.jpg", "test.jpg")
for i in range(len(list_bucket_folder)):
    d = os.path.join(file_name, list_bucket_folder[i])
    print("liste")
    lst = os.listdir(d)
    lst = sorted_alphanumeric(lst)
   # print(lst)
    if os.path.isdir(d) and d.endswith(".DS_Store") == False:
      
       
        print(list_bucket_folder[count])
    
    
    
        for f in lst:
            if f.endswith(".DS_Store") == False:
                t = str(d+"/"+f)
             
                print(list_bucket_folder[count]+"/"+f)
      
                upload_blob(bucket_name,t ,list_bucket_folder[i]+"/"+f)
              #  delete_blob(bucket_name, d+"/"+f)

                #os.remove(d+"/"+f)
                #print(os.path.basename(d))
    count += 1
        


#upload_blob(bucket_name, "temp/1.mp4", "video/1.mp4")