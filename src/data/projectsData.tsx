import netflixDemo from "../../public/images/netflix-demo.gif";
import githubFinderDemo from "../../public/images/github-finder-demo.gif";
import arvrDemo from "../../public/images/augmented-reality-projects.webp";
import blenderProjectsDemo from "../../public/images/3d-modelling-projects.jpg";
import planetStarsDemo from "../../public/images/planet-and-stars.gif";
import arvrskillsArticle from "../../public/images/ar-vr-skills-article.jpeg";
import unityVuforiaArticle from "../../public/images/how-to-create-ar-experience-unity-vuforia.webp";
import vr360VideoArticle from "../../public/images/how-to-make-360-vr-video-unity.webp";
import googleTripArticle from "../../public/images/google-trip.jpg";

const projectsData = [
    {
      title: "OTT Wars",
      description: "A web app (ongoing project) to pick your favourite movie and test your knowledge by answering questions.",
      media: netflixDemo,
      demoURL: "https://netflix-clone-knightcube.vercel.app/",
      codeURL: "https://github.com/knightcube/netflix-clone",
      articleURL:"",
      type:"project",
    },
    {
      title: "GitHub Finder",
      description: "An app integrated with GitHub API to search users.",
      media: githubFinderDemo,
      demoURL: "https://github-finder-demo-ten.vercel.app/",
      codeURL: "https://github.com/knightcube/github-finder-demo",
      articleURL:"",
      type:"project",
    },
    {
      title: "AR/VR Projects Compilation",
      description: "A video compilation of AR/VR Projects and prototypes that I have worked on till date.",
      media: arvrDemo,
      demoURL: "https://www.youtube.com/watch?v=PsxLB0YMSO4",
      codeURL: "",
      articleURL:"",
      type:"project",
    },
    {
      title: "3D Modelling Projects Reel",
      description: "A video compilation of 3D Models and animations that I designed with Blender.",
      media: blenderProjectsDemo,
      demoURL: "https://www.youtube.com/watch?v=KhCo_P5UaMo",
      codeURL: "",
      articleURL:"",
      type:"project",
    },
    {
        title: "Planets and Stars",
        description: "A 3D website showcasing the power of Three.js.",
        media: planetStarsDemo,
        demoURL: "https://knightcube.github.io/planet-and-stars-threejs/",
        codeURL: "https://github.com/knightcube/planet-and-stars-threejs",
        articleURL:"",
        type:"project",
      },
    {
        title: "9 Must Have Skills To Become An AR/VR Developer",
        description: "This article of mine is published in HackerNoon and more than 25000+ reads. It also shows up on the first page of Google if you search for \"ar/vr skills\".",
        media: arvrskillsArticle,
        demoURL: "",
        codeURL: "",
        articleURL:"https://hackernoon.com/9-must-have-skills-to-become-an-arvr-developer-with-course-recommendations-e15s317e",
        type:"article",
      },
      {
        title: "How to create an AR experience with Unity and Vuforia",
        description: "In this article (published in LogRocket), you will learn how to create an augmented reality experience using Vuforia and Unity. You will also learn how to test and run your app on an Android smartphone.",
        media: unityVuforiaArticle,
        demoURL: "",
        codeURL: "",
        articleURL:"https://blog.logrocket.com/create-ar-experience-unity-vuforia/",
        type:"article",
      },
      {
        title: "How to make a 360 VR video in Unity",
        description: "In this article (published in LogRocket), I will show you how to create a 360 VR video in Unity with the help of two tools- Unity Recorder & Google Spatial Media Metadata Injector",
        media: vr360VideoArticle,
        demoURL: "",
        codeURL: "",
        articleURL:"https://blog.logrocket.com/make-360-vr-video-unity/",
        type:"article",
      },
      {
        title: "Google I/O 2019 Trip (Sponsored by Google)",
        description: "I earned a fully sponsored trip to attend Google I/O 2019 conference at Mountain View, California.",
        media: googleTripArticle,
        demoURL: "",
        codeURL: "",
        articleURL:"https://medium.com/@knightcube/google-i-o-2019-experience-cf0692aacb9d",
        type:"article",
      },

  ];

export default projectsData