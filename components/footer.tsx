import { Coffee, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"

export function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground mt-16 md:mt-20 lg:mt-24">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Coffee className="h-8 w-8 text-accent" />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight">Rustique</span>
                <span className="text-xs text-primary-foreground/80 -mt-1 tracking-wider">CAFÉ</span>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 text-pretty">
              Crafting exceptional coffee experiences since 2018. Where rustic charm meets premium quality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a href="#contact" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80">123 Main Street, Coffee District</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80">(555) 123-CAFÉ</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80">hello@rustiquecafe.com</span>
              </li>
            </ul>
          </div>

          {/* Social & Hours */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-2 mb-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground/80 hover:text-accent hover:bg-primary-foreground/10"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground/80 hover:text-accent hover:bg-primary-foreground/10"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground/80 hover:text-accent hover:bg-primary-foreground/10"
              >
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm">
              <p className="font-medium mb-1">Hours</p>
              <p className="text-primary-foreground/80">Mon-Fri: 6:30am-8pm</p>
              <p className="text-primary-foreground/80">Sat-Sun: 7am-9pm</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/60">
            © 2024 Rustique Café. All rights reserved. Made with ❤️ and lots of coffee.
          </p>
        </div>
      </div>
    </footer>
  )
}
