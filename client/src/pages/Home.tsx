import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-neutral-dark">Sample Website Content</h1>
      <p className="mb-4 text-lg">This is a demo page to show the accessibility widget in action. The widget appears in the bottom right corner of the screen.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-3">Section One</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at justo id nisi efficitur faucibus. Phasellus ultrices, nisl vel posuere tincidunt, metus urna faucibus enim, vel varius odio leo vel elit.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-3">Section Two</h2>
            <p>Praesent ac dignissim mi. Donec vitae tempus mi, vitae tempor velit. Praesent malesuada eros non lorem dapibus, a dignissim nunc egestas. Vivamus efficitur tortor sit amet dolor tincidunt.</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-3">Form Example</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1 font-medium">Message</label>
              <textarea 
                id="message" 
                rows={4} 
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Submit
            </button>
          </form>
        </CardContent>
      </Card>
      
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Accessibility Widget Features:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Toggle widget with button in bottom-right corner or by pressing Alt+A</li>
          <li>Choose from predefined accessibility profiles</li>
          <li>Adjust display options (contrast, saturation, monochrome)</li>
          <li>Scale content (text size, line spacing, letter spacing)</li>
          <li>Enable reading guide and large cursor</li>
          <li>Settings persist between sessions via local storage</li>
        </ul>
      </div>
    </div>
  );
}
