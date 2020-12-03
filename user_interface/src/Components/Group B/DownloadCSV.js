import axios from 'axios';
import { Button } from 'react-bootstrap';
import { saveAs } from 'file-saver';


const CSVButton = () => {

  return (
    <Button
      variant="success"
      onClick={async () => {
        try {

          const { data } =  await axios.get('/data/download_csv');
          const blob = new Blob([data], { type: 'text/csv' });
          saveAs(blob, 'test.csv');
          
        } catch(err) {

          console.error(err);

        }
      }}
    >
      Download
    </Button>
  )

}

export default CSVButton;