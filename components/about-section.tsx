import { Card, CardContent } from "./ui/card"
import { Coffee, Heart, Users } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-balance">Our Story</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Founded in 2018, Rustique Café began as a dream to create a warm, welcoming space where community and
            exceptional coffee come together. Every cup we serve is crafted with passion and sourced with care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center p-6 bg-card border-border hover:shadow-md transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Coffee className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground">Premium Quality</h3>
              <p className="text-muted-foreground text-pretty">
                We source our beans directly from sustainable farms, ensuring every cup meets our high standards.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 bg-card border-border hover:shadow-md transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground">Made with Love</h3>
              <p className="text-muted-foreground text-pretty">
                Every drink and pastry is handcrafted by our skilled baristas who are passionate about their craft.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 bg-card border-border hover:shadow-md transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground">Community First</h3>
              <p className="text-muted-foreground text-pretty">
                We're more than a café - we're a gathering place where friendships are made and memories are created.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-card rounded-lg p-8 border border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Visit Our Café</h3>
              <p className="text-muted-foreground mb-6 text-pretty">
                Experience the warmth of our rustic atmosphere, where exposed brick walls meet comfortable seating, and
                the aroma of freshly roasted coffee fills the air. Whether you're here for a quick espresso or settling
                in for the afternoon, you'll find your perfect spot.
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Hours:</span> Mon-Fri 6:30am-8pm, Sat-Sun 7am-9pm
                </p>
                <p>
                  <span className="font-medium">Location:</span> 123 Main Street, Coffee District
                </p>
                <p>
                  <span className="font-medium">Phone:</span> (555) 123-CAFÉ
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/rustic-coffee-shop-interior-cozy-seating-warm-ligh.png"
                alt="Rustique Café Interior"
                className="w-full h-64 lg:h-80 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
