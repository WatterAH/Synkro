"use client";

import AppSidebar from "@/components/global/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useCheckToken } from "@/hooks/useAuth";
import { Footprints } from "lucide-react";
import Script from "next/script";
import { useState } from "react";
import { animated, useSpring } from "react-spring";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useCheckToken();
  const [loader, setLoader] = useState(true);

  const AnimatedDiv: React.FC<React.PropsWithChildren<any>> = animated.div;
  const loaderSpring = useSpring({
    transform: loading ? "translateY(0)" : "translateY(-100%)",
    opacity: loading ? 1 : 0,
    config: { tension: 300, friction: 50 },
    onRest: () => {
      if (!loading) {
        setTimeout(() => {
          setLoader(false);
        }, 10);
      }
    },
  });

  return loader ? (
    <AnimatedDiv
      style={loaderSpring}
      className="flex h-screen justify-center items-center bg-white"
    >
      <span className="flex gap-4">
        <Footprints className="mt-1 text-cyan-600" size={50} />
        <h1 className="text-5xl font-urbanist font-extrabold">Synkro</h1>
      </span>
    </AnimatedDiv>
  ) : (
    <main className="bg-background h-screen w-full overflow-y-scroll">
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full space-y-0">{children}</div>
      </SidebarProvider>

      {/* Watson Assistant Chatbot */}
      <Script id="watson-chat" strategy="afterInteractive">
        {`
            window.watsonAssistantChatOptions = {
              integrationID: "6cc136ab-c67a-422e-9ccd-621a9dc96a42",
              region: "au-syd",
              serviceInstanceID: "7b9f97ca-535e-49a3-84da-5e2e29c739e6",
              onLoad: async (instance) => { await instance.render(); }
            };
            setTimeout(function(){
              const t = document.createElement('script');
              t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + 
                (window.watsonAssistantChatOptions.clientVersion || 'latest') + 
                "/WatsonAssistantChatEntry.js";
              document.head.appendChild(t);
            });
          `}
      </Script>
    </main>
  );
}
