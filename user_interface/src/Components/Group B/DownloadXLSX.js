import axios from 'axios';
import { Button } from 'react-bootstrap';
import { saveAs } from 'file-saver';


const XLSXButton = () => {

  return (
    <Button
      variant="success"
      onClick={async () => {
        try {

          const { data } =  await axios.get('/data/download_xlsx');
          const byteArray = Buffer.from(data, 'base64');
          const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          saveAs(blob, 'test.xlsx', true);
          
        } catch(err) {

          console.error(err);

        }
      }}
    >
      Download
    </Button>
  )

}

export default XLSXButton;