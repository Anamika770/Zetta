import UploadForm from "../components/features/UploadForm";

const Upload = () => {
  return (
    <div className="p-8">
      <div className="bg-zinc-900 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-semibold mb-8 text-amber-200 p-8 pb-4">
          Upload Files
        </h1>
        <div className="px-8 pb-8">
          <UploadForm onUpload={() => window.location.href = "/"} />
          <p className="text-center text-gray-400 text-sm mt-6">
            Or navigate to a folder to upload files directly inside it
          </p>
        </div>
      </div>
    </div>
  );
};

export default Upload;
