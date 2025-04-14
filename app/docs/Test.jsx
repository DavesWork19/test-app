// import { useState, useEffect } from 'react';

// export default function Test() {
//   const [fileContent, setFileContent] = useState('');

//   useEffect(() => {
//     const storedFile = localStorage.getItem('myFile');
//     if (storedFile) {
//       setFileContent(storedFile);
//     }
//   }, []);

//   const handleFileChange = (event) => {
//     console.log('test', event.target.files[0].name);
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const content = e.target.result;
//         setFileContent(content);
//         localStorage.setItem('myFile', content);
//       };
//       reader.readAsText(file);
//     }
//   };

//   console.log('file info', fileContent);

//   return (
//     <div>
//       <input type='file' onChange={handleFileChange} />
//       {fileContent && (
//         <p>
//           <b>File Content:</b>
//         </p>
//       )}
//       <textarea rows={10} cols={50} value={fileContent} readOnly />
//       <embed
//         style={{
//           width: '100%',
//           height: '100%',
//         }}
//         type='application/pdf'
//         src={'David_Carney_Resume_PDF.pdf'}
//       />
//     </div>
//   );
// }
import { useState } from 'react';

const Test = () => {
  const [selectedImage, setSelectedImage] = useState();

  // Just some styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 50,
    },
    preview: {
      marginTop: 50,
      display: 'flex',
      flexDirection: 'column',
    },
    image: { maxWidth: '100%', maxHeight: 320 },
    delete: {
      cursor: 'pointer',
      padding: 15,
      background: 'red',
      color: 'white',
      border: 'none',
    },
  };

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  return (
    <>
      <div style={styles.container}>
        <input type='file' onChange={imageChange} />

        {selectedImage && (
          <div style={styles.preview}>
            <img
              src={URL.createObjectURL(selectedImage)}
              style={styles.image}
              alt='Thumb'
            />
            <button onClick={removeSelectedImage} style={styles.delete}>
              Remove This Image
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Test;
