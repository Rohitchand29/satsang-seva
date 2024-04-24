"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PopoverContent } from "@/components/ui/popover"
import { useState } from "react";
import GoogleProvider from "./GoogleProvider";
import LoginComponent from "./LoginComponent";


const Login = () => {
  const [_provider, setProvider] = useState(0);
  const providers = [
    {
      label: "Google",
      component: <GoogleProvider />
    },
    {
      label: "Phone Number",
      component: <LoginComponent />
    },
  ]
  return (
    <Card className="py-0">
      <CardHeader>
        <CardDescription>Welcome to Satsang Seva</CardDescription>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          {
            providers.map((provider, index) => (
              <Button type="button" key={index} variant={(index == _provider) ? "" : "outline"} onClick={() => setProvider(index)}>
                {provider.label}
              </Button>
            ))
          }
        </div>
        {
          providers.map((provider, index) => {
            return (index == _provider)?
             (
              <div key={index}>
                {provider.component}
              </div>
            ): <></>
          })
        }
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}

export default Login