import { useLocation } from "react-router-dom";

const File = () => {
  const location = useLocation();
  return (
    <div className="text-amber-50 m-auto">
        <h1 className="text-2xl  font-bold mb-4 text-center ">{location.pathname.split('/').pop()}</h1>
        {
            location.state?.mimeType ?  (
                <iframe 
                    src={`http://localhost/file${location.pathname}?action=preview`} 
                    title={location.pathname.split('/').pop()}
                    className="w-[180%] min-h-screen"
                />
            ) : null
        }
    </div>
  )
}

export default File;