export default function Upload() {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold">Upload a Video</h1>
        <p className="mt-4 text-lg">Upload a lecture video to generate notes.</p>
        <input type="file" className="mt-4 border border-gray-300 p-2"/>
      </div>
    );
  }
  