import { hydrateRoot } from "react-dom/client";
import Header from "./components/Header";
import Rail from "./components/Rail";
import { start } from "./lib/controller";
import type { PageData } from "./lib/shared";

// The page is plain HTML. This wakes up the two interactive parts and wires the rest.
const data: PageData = JSON.parse(document.getElementById("page-data")!.textContent!);
start();
hydrateRoot(document.getElementById("header-root")!, <Header {...data} />);
hydrateRoot(document.getElementById("rail-root")!, <Rail {...data} />);
