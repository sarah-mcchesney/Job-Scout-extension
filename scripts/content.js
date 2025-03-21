let lastJobId = null;
let currentJob = null;
let previousJob = null;
let nextJob = null;
let extensionEnabled = null; 
let currentPage = null;
let nextPage=null;
let previousPage = null;


function loadKeybindings() {
    chrome.storage.local.get(["shortcutPreferences"], function(result) {
        if (result.shortcutPreferences) {
            shortcutKeys = result.shortcutPreferences;  
        }
    });
}
chrome.storage.local.get(["extensionEnabled"], function(result) {
    extensionEnabled = result.extensionEnabled; 
});

chrome.storage.onChanged.addListener(function(changes, areaName) {

    if (changes.extensionEnabled) {
        extensionEnabled = changes.extensionEnabled.newValue;
    }

    if (changes.shortcutPreferences) {
        loadKeybindings(); 
    }
});

function logCurrentJobId() {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const currentJobId = url.searchParams.get('currentJobId');

    if (currentJobId !== lastJobId) {
        lastJobId = currentJobId;
    }

    currentJob = document.querySelector('[data-job-id="' + lastJobId + '"]');

    if (currentJob && currentJob.querySelector('.job-card-list__entity-lockup')) {
        const parentLevelTwo = currentJob.parentElement.parentElement;
        nextJob = parentLevelTwo.nextElementSibling;
        previousJob = parentLevelTwo.previousElementSibling;
    }
}
//current page 
function getPages(){
    //current page
    var element = document.querySelector('.artdeco-pagination__indicator.artdeco-pagination__indicator--number.active.selected.ember-view');
    var idNumber= element.getAttribute("data-test-pagination-page-btn");
    previousPage = element.previousElementSibling || null;
    nextPage = element.nextElementSibling || null;


    
};
   
 

function recalculateJobs() {
    logCurrentJobId();
    
}


function linkedinShortcuts(e){
    e = e || window.event;
    var key = e.key;
    if (extensionEnabled === false) {
        return;
    }
    var element = document.querySelector('.artdeco-pagination__indicator.artdeco-pagination__indicator--number.active.selected.ember-view');
    //if there is only one page, then disable next/prev pages so it doesn't throw error 
    if(element){
        previousPage = element.previousElementSibling || null;
        nextPage = element.nextElementSibling || null;
        if(key=== shortcutKeys.pPage){
            var button = previousPage.children[0];
            button.click();
            setTimeout(recalculateJobs, 30);  
    
        }
        if(key=== shortcutKeys.nPage){
            var button = nextPage.children[0];
            button.click();
            setTimeout(recalculateJobs, 30);  
    
        }
    }
    
    if (key === shortcutKeys.pJob ) {  
        if (previousJob) {
            var a = previousJob.children[0];
            var s = a.children[0];           
            s.click();
           
           
            s.scrollIntoView();
          

            setTimeout(recalculateJobs, 30);  
        }
    }
   

    if (key === shortcutKeys.nJob) {  
        if (nextJob) {
            var a = nextJob.children[0];
            var s = a.children[0];
           
            s.click();

            s.scrollIntoView(); 
           
          
            setTimeout(recalculateJobs, 30); 
        }

    }

    if (key === shortcutKeys.dJob) {
        var curr = currentJob.children[1];

        var e = curr.children[0].children[0];
        e.click();
        setTimeout(recalculateJobs, 30); 
    }
    if(key=== shortcutKeys.sJob){
        const saveButtons = document.getElementsByClassName('jobs-save-button');
        if (saveButtons.length > 0) {
            saveButtons[0].click();
        }
    }
    if(key==shortcutKeys.aJob){
        const applyButtons = document.getElementsByClassName('jobs-apply-button');
        if (applyButtons.length > 0) {
            applyButtons[0].click();
        }
    }
    
}


function logCurrentJobIdIndeed() {
    lastJobId = null;
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const currentJobId = url.searchParams.get('vjk');
    if (currentJobId !== lastJobId) {
        lastJobId = currentJobId;
    }
    currentJob = document.querySelector('[data-jk="' + lastJobId + '"]');
    if (currentJob) {
        parent=currentJob;
        while (parent) {
            if (parent.tagName === 'LI') {
                break;
            }
            parent = parent.parentElement; 
        }
     
      
        nextJob=parent.nextSibling;
        var nchild= nextJob.firstChild;
        if(nchild && nchild.classList && nchild.classList.contains('mosaic-empty-zone')){
            nextJob=nextJob.nextElementSibling;
        }
        previousJob= parent.previousSibling;
        var pChild = previousJob.firstChild;

        if(pChild && pChild.classList && pChild.classList.contains('mosaic-empty-zone')){
            previousJob=previousJob.previousElementSibling;
            
        }
     
    }
}

const observer = new MutationObserver(function (mutations) {
    const currentUrl = window.location.href;
    
    if (currentUrl.includes('linkedin')) {
        logCurrentJobId(); 
    } else if (currentUrl.includes('indeed')) {
        logCurrentJobIdIndeed();
    }
});

observer.observe(document.body, {
    childList: true, 
    subtree: true,   
});



let shortcutKeys = {
    pJob: null,  
    nJob: null,
    pPage: null,
    nPage: null,
    dJob: null, 
    sJob: null, 
    aJob: null
};

function checkAndExecute() {
    if (window.location.href.startsWith("https://www.linkedin.com/jobs/search/")|| window.location.href.startsWith("https://www.indeed.com/jobs") ){
        recalculateJobs();
        loadKeybindings();
    }
}


// Set an interval to repeatedly check every 2 seconds (2000ms)
setInterval(checkAndExecute, 200);





function indeedShortcuts(e){
    e = e || window.event;
    var key = e.key;
    if (extensionEnabled === false) {
        return;
    }
    var element = document.querySelector('[data-testid="pagination-page-current"]');
    var element=element.parentElement.firstChild;
    console.log("current: ", element);
    //if there is only one page, then disable next/prev pages so it doesn't throw error 
    if(element){
        const previousPage = element.parentElement.previousElementSibling?.firstChild || null;
        const nextPage = element.parentElement.nextElementSibling?.firstChild || null;
       console.log(previousPage);
       console.log(nextPage);

        if(key=== shortcutKeys.pPage){
            previousPage.click();
            setTimeout(recalculateJobs, 30);  
    
        }
        if(key=== shortcutKeys.nPage){
            nextPage.click();
            setTimeout(recalculateJobs, 30);  
    
        }
    }
    
    if (key === shortcutKeys.pJob ) {  
        if (previousJob) {
                 
            const indeedPrev= previousJob.querySelector('[data-mobtk]');
            indeedPrev.click(); 
         

            setTimeout(recalculateJobs, 30);  
        }
    }
   

    if (key === shortcutKeys.nJob) {  
        if (nextJob) {
            
            const indeedNext = nextJob.querySelector('[data-mobtk]');
            indeedNext.click();

            
          
            setTimeout(recalculateJobs, 30); 
        }

    }

    if (key === shortcutKeys.dJob) {
        

        //indeed delete 
        var rightPane=document.getElementsByClassName('jobsearch-RightPane');
        var deleteButton = rightPane[0].querySelector('[aria-pressed]');
        deleteButton.click();

        e.click();
        setTimeout(recalculateJobs, 30); 
    }
    if(key=== shortcutKeys.sJob){
       
        //indeed save
         var rightPane=document.getElementsByClassName('jobsearch-RightPane');
        var indeedSave = rightPane[0].querySelector('[data-dd-action-name]');
        indeedSave.click();
    }
    if(key==shortcutKeys.aJob){
        
        var rightPane=document.getElementsByClassName('jobsearch-RightPane');
        var indeedApply = rightPane[0].querySelector('[data-testid="indeed-apply-widget"]');
        indeedApply.click();
    }
}


    
document.addEventListener('keydown', function(e) {
    const currentUrl = window.location.href;

    if (currentUrl.includes('linkedin')) {
        linkedinShortcuts(e);
    } else if (currentUrl.includes('indeed')) {
        indeedShortcuts(e); 
    }
});