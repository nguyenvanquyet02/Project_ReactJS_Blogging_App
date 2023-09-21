import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";

export default function useFirebaseImage(setValue, getValue, imageName = null, cb) {
    const [image, setImage] = useState("");
    const [progress, setProgress] = useState(0);
    const storage = getStorage();
    if (!setValue || !getValue) return;
    // this function is used for loading image return downloadURL
    const handleUploadImage = (file) => {
        const storageRef = ref(storage, "images/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed", (snapshot) => {
            const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progressPercent);
        },
            (error) => {
                console.log("ERROR: ", error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImage(downloadURL);
                })
            })
    }
    const handleResetImage = () => {
        setImage(null);
        setProgress(0);// % upload || remove
    }
    const handleSelectImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setValue("image_name", file.name)
        handleUploadImage(file);
    }
    const handleDeleteImage = () => {
        // Create a reference to the file to delete
        const imageRef = ref(storage, 'images/' + imageName || getValue("image_name"));
        // Delete the file
        deleteObject(imageRef).then(() => {
            // File deleted successfully
            handleResetImage();
            cb && cb();
        }).catch((error) => {
            console.log("Can not delete image: ", error);
        });
    }
    return {
        image,
        progress,
        setImage,
        handleResetImage,
        handleSelectImage,
        handleDeleteImage
    }
}