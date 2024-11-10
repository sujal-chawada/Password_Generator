document.addEventListener("DOMContentLoaded",function(){
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLable =document.getElementById("easy-label");
    const mediumLable = document.getElementById("medium-label");
    const hardLable = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");


    // return true or false based on regex
    function validateUsername(username) {
        if(username.trim() === "") {
            alert("username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching){
            alert("invalid username");
        }
        return isMatching;
    }


    async function fetchUserDetails(username){
        // const url = `https://leetcode.com/graphql`
        // `https://leetcode.com/graphql`
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`
        try{
            searchButton.textContent = "searching...";
            searchButton.disabled = true;
            // const response = await fetch(url);
            // const proxyUrl = "https://cors-anywhere.herokuapp.com/ "
            // const targetUrl = `https://leetcode.com/graphql/`
            // const myHeaders = new Headers();
            // myHeaders.append("content-type", "application/json");
    
            // const graphql = JSON.stringify({
            //     query: "\n    query userProfileUserQuestionProgressV2($userSlug: String!) {\n  userProfileUserQuestionProgressV2(userSlug: $userSlug) {\n    numAcceptedQuestions {\n      count\n      difficulty\n    }\n    numFailedQuestions {\n      count\n      difficulty\n    }\n    numUntouchedQuestions {\n      count\n      difficulty\n    }\n    userSessionBeatsPercentage {\n      difficulty\n      percentage\n    }\n    totalQuestionBeatsPercentage\n  }\n}\n    ",
            //     variables: {"username": `${username}`}
            // })
            // const requestOptions = {
            //     method: "POST",
            //     headers: myHeaders,
            //     body: graphql,
            //     redirect: "follow"
            // };
            const response = await fetch(url);
                // proxyUrl+targetUrl,requestOptions

            
            if(!response.ok){
                throw new Error("unable to fetch the user details")
            }
            const data = await response.json();
            console.log("Logging data : ",data);
        }
        catch(error){
            statsContainer.innerHTML = `<p>No data Found</p>`
        }
        finally{
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    searchButton.addEventListener("click",function(){
        const username = usernameInput.value;
        console.log("login username: ",username);
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })
})