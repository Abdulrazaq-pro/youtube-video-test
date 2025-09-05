import toast, { Toaster } from "react-hot-toast";
import Demo from "../components/thumbnail-button-player";

const notify = () => toast("Here is your toast.");

export default function App() {
  return (
    <div>
      <button onClick={notify}>Make me a toast</button>
      <Demo/>
    </div>
  );
}
