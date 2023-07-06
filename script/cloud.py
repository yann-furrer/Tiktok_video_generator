# Imports the Google Cloud client library
from google.cloud import storage




# The name for the new bucket
bucket_name = "tiktok-bucket"


def create_bucket_folder(bucket_name, folder_name):
    """Creates a folder in a bucket."""
    # bucket_name = "your-bucket-name"
    # folder_name = "your-folder-name/"
 
    storage_client = storage.Client()

    bucket = storage_client.bucket(bucket_name)

    # Create a new blob and upload the file's content.
  
    bucket = storage_client.get_bucket(bucket_name)
    print("bucket: ", bucket)

    blob = bucket.blob(folder_name+"/", )
    blob.upload_from_string(folder_name)


    print("Bucket folder {} created".format(folder_name))









def create_bucket(bucket_name):
    """Creates a new bucket."""
    # bucket_name = "your-new-bucket-name"

    storage_client = storage.Client()

   # bucket = storage_client.create_bucket(bucket_name)

    create_bucket_folder(bucket_name, "image")
    create_bucket_folder(bucket_name, "voice")
    create_bucket_folder(bucket_name, "subtitle")
  
    print("Bucket {} created".format(bucket_name))
    #create_bucket_folder(bucket_name, "/photo/")




def upload_blob(bucket_name, source_file_name, destination_blob_name):
    """Uploads a file to the bucket."""
    # bucket_name = "your-bucket-name"
    # source_file_name = "local/path/to/file"
    # destination_blob_name = "storage-object-name"
    print("upload_blob")
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)
    print("upload_blob")
    blob.upload_from_filename(source_file_name)
    print(
        "File {} uploaded to {}.".format(
            source_file_name, destination_blob_name
        )
    )


def uplaod_list_file(bucket_name, list_file_name, destination_blob_name):
    """Uploads a file to the bucket."""
    # bucket_name = "your-bucket-name"
    # source_file_name = "local/path/to/file"
    # destination_blob_name = "storage-object-name"
    print("upload_blob")
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)
    print("upload_blob")
    blob.upload_from_filename(list_file_name)
    print(
        "File {} uploaded to {}.".format(
            list_file_name, destination_blob_name
        )
    )



def get_file_from_bucket(source_blob_name, destination_file_name):
        """Downloads a blob from the bucket."""
        # bucket_name = "your-bucket-name"
        # source_blob_name = "storage-object-name"
        # destination_file_name = "local/path/to/file"
        storage_client = storage.Client()
        bucket = storage_client.bucket(bucket_name)
        blob = bucket.blob(source_blob_name)

        blob.download_to_filename(destination_file_name)

        print(
            "Blob {} downloaded to {}.".format(
                source_blob_name, destination_file_name
            )
        )

def delete_blob(bucket_name, blob_name):
            """Deletes a blob from the bucket."""
            # bucket_name = "your-bucket-name"
            # blob_name = "your-object-name"

            storage_client = storage.Client()

            bucket = storage_client.bucket(bucket_name)
            blob = bucket.blob(blob_name)
            blob.delete()

            print("Blob {} deleted.".format(blob_name))



#upload_blob(bucket_name, "/Users/yannfurrer/Desktop/video/script/temp/image/image2.jpg", "test.jpg")
def delete_bucket(bucket_name):
    """Deletes a bucket. The bucket must be empty."""
    # bucket_name = "your-bucket-name"

    storage_client = storage.Client()

    bucket = storage_client.get_bucket(bucket_name)
    bucket.delete()

    print("Bucket {} deleted".format(bucket.name))
#create_bucket_folder(bucket_name, "/photo/")




#delete all content in bucket
def delete_bucket_content(bucket_name):
    """Deletes all the blobs in the bucket."""
    # bucket_name = "your-bucket-name"

    storage_client = storage.Client()

    bucket = storage_client.get_bucket(bucket_name)

    blobs = bucket.list_blobs()

    for blob in blobs:
        blob.delete()

    print("All blobs in {} deleted".format(bucket.name))

def check_bucket_exist(bucket_name):
    """Determines whether a bucket exists."""
    # bucket_name = "your-bucket-name"

    storage_client = storage.Client()

    bucket = storage_client.bucket(bucket_name)
    try:
        bucket = storage_client.get_bucket(bucket_name)
        print("Bucket {} already exist".format(bucket.name))
        return True
    except:
        print("Bucket {} does not exist".format(bucket.name))
        return False
    
