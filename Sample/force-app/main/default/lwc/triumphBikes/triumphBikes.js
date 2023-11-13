import { LightningElement, wire,track,api } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import getPriceRange from '@salesforce/apex/FetchTriumphRecords.getPriceRange'
import triumphRecords from '@salesforce/apex/FetchTriumphRecords.getTriumph';
import searchbikes from '@salesforce/apex/FetchTriumphRecords.searchBikes';
import cartData from '@salesforce/apex/FetchTriumphRecords.insertCartData';
import getTotalItems from '@salesforce/apex/FetchAddToCartRecords.getTotalItems'
export default class TriumphBikes extends NavigationMixin(LightningElement) {

    enfieldlogo = 'https://seeklogo.com/images/R/royal-enfield-logo-DCC1AE444E-seeklogo.com.png'
    triumphlogo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC_l-MWJRWX93z0opUHVa60MkunW55DtFSmMiFpETma6eMpI9J_OnWlkxm0u_4mbfWz98&usqp=CAU';
    ducatiLogo  = 'https://i.pinimg.com/236x/9f/ca/c5/9fcac5fb7e21ca932cc266b14f46c518.jpg';
    harleyLogo = 'https://i.pinimg.com/236x/b9/56/38/b956380e16109877b2e86f8006ef7b42.jpg';
    kawasakiLogo = 'https://i.pinimg.com/236x/ae/b2/6e/aeb26e211e6c2efeea93b98630c33682.jpg';
    bmwlogo = 'https://thinkmarketingmagazine.com/wp-content/uploads/2012/08/bmw-logo.png';
    benellilogo = 'https://cdn-0.motorcycle-logos.com/wp-content/uploads/2017/02/Benelli-Logo.jpg'

    showBikes = false;
    goBack = true;
    showCarousel = false;

    handleGoBack(event){
        this.goBack = false;
        this.searched ='';
        this.showBikes = true;
    }
    goToRoyal(event){
        this.showBikes = false;
        if(this.showBikes = true){
            this.searched = 'Royal';
            this.goBack = true;
            this.showCarousel = true;
        }
    }
    goToTriumph(event){
        this.showBikes = false;
        if(this.showBikes = true){
            this.searched = 'triumph';
            this.goBack = true;
            this.showCarousel = true;
        }
    }
    goToDucati(event){
        this.showBikes = false;
        if(this.showBikes = true){
            this.searched = 'Ducati';
            this.showCarousel = true;
        }
    }
    gotToHarley(event){
        this.showBikes = false;
        if(this.showBikes = true){
            this.searched = 'Harley';
            this.showCarousel = true
        }
    }
    gotToKawasaki(event){
        this.showBikes = false;
        if(this.showBikes = true){
            this.searched = 'Kawasaki';
            this.showCarousel = true;
        }
    }
    goToBMW(event){
        this.showBikes = false;
        if(this.showBikes = true){
            this.searched = 'BMW';
            this.goBack = true;
            this.showCarousel = true;
        }
    }
    goToBenelli(event){
        this.showBikes = false;
        if(this.showBikes = true){
            this.searched = 'Benelli';
            this.goBack = true;
            this.showCarousel = true;
        }
    }

    searched='';
    storeDetailsId;
    cartLogo = 'https://img.icons8.com/?size=1x&id=1Fox99oW5hd_&format=png'


     


//For filtering bikes according to the price
    SelectedPrice = null;
    products;
    Priceoptions = [
        { label: 'All bikes', value:''},
        { label: 'Under 4 lakh', value: '400000'},
        { label: 'Under 10 lakh', value: '1000000'},
        { label: 'Under 12 lakh', value: '1200000'},
        { label: 'Under 16 lakh', value: '1600000' },
        { label: 'Under 20 lakh', value: '2000000' },
        { label: 'Under 25 lakh', value: '2500000' },
        { label: 'Under 50 lakh', value: '5000000' },
        { label: 'Under 80 lakh', value: '8000000' },
    ];

    @wire (getPriceRange,{ priceRange: '$SelectedPrice' })
    wiredProducts({error, data}){
        if(data){
            this.products = data;
        }
        else if(error){
            console.error('Error fetching products:', error);
            this.products = null;
        }
    }

    handlePriceChange(event){
        this.SelectedPrice = event.detail.value;
        return refreshApex(this.wiredProducts);
    }

    get filterRecords(){
        const price = parseInt(this.SelectedPrice);
        if(!price ||  isNaN (price)){
            return this.searc.data;
        }
        return this.searc.data.filter((Bike__c) => Bike__c.Price__c <= price);
    }


 @wire(triumphRecords) bikesData;
 @wire(searchbikes, {bikeName: '$searched'}) searc;

    handleclick(event){
        //searching bikes
        this.searched= event.target.value;
    }



    @track isDetailModalOpen = false;
    @track isOrderModalOpen = false;

// Get the specific Bike__c data from the clicked button's value attribute
    handleDetails(event) {

        this.storeDetailsId = event.target.value;
        //alert(this.storeDetailsId);
        this.isDetailModalOpen = true;

    }
    closeModal(){
        this.isDetailModalOpen = false;
    }





//Placing the order of bike by getting record id
    @api handlecancel;
    ordernow(event){
        //this.storeOrdersId = event.target.value;
        this.isOrderModalOpen = true;

    }
    closeModals(){
        this.isOrderModalOpen = false;
    }
    handlecancel(){
        this.isOrderModalOpen = false;
    }



    


    //Add to cart button functionality
    
    @track bikearray=[];
    @track loaddata;
    @track bikenames;
    @track bikeengine;
    @track fuelc;
    @track images;
    @track weight;
    @track power;
    @track prices;
    @track gearbox;

    addToCart(event){
        this.loaddata = event.target.value;
        this.bikearray.push(this.loaddata);
        console.log(JSON.parse(JSON.stringify(this.bikearray)));
        this.bikenames = this.loaddata.Name;
        this.bikeengine = this.loaddata.Engine_Capacity__c;
        this.fuelc = this.loaddata.Fuel_Tank_Capacity__c;
        this.images = this.loaddata.Image__c;
        this.weight = this.loaddata.Kerb_Weight__c;
        this.power = this.loaddata.Max_Power__c;
        this.prices  = this.loaddata.Price__c;
        this.gearbox = this.loaddata.Transmission__c;

        cartData({bikename:this.bikenames, engine:this.bikeengine, fueltank:this.fuelc, image:this.images, kerbweight:this.weight, maxpower:this.power, transmisson:this.gearbox, price:this.prices}) 
        .then((result) => {
           //return refreshApex(this.bikesData);
            
        }).catch((err) => {
            
        });

        const evnt = new ShowToastEvent({
            title: 'Item added to cart',
            message: 'Success',
            variant: 'success'

        });
        this.dispatchEvent(evnt);

        

    }

    //Navigating to the cart items
    handleGo(){
        this[NavigationMixin.Navigate]({

            type: 'standard__webPage',

            attributes: {

                url: '/lightning/n/Cart_Items'

            }

        });
    }

    //Counting number of items
    totalItems;
    @wire(getTotalItems) getcount({data, error}){
        if(data){
            this.totalItems = JSON.stringify(data[0].expr0);
            //return refreshApex(this.getcount);
            console.log(this.totalItems);
        }
    }
    

    connectedCallback() {
    // Refresh the wired properties (bikesData and totalItems) after the component is connected to the DOM
    Promise.all([refreshApex(this.bikesData), refreshApex(this.getcount)])
        .then(() => {
            // Any additional logic you want to perform after the data is refreshed
        })
        .catch((error) => {
            // Handle any errors that occur during the data refresh
            console.error('Error refreshing data:', error);
        });
    }

//Footer logos    
    facebooklogo='https://img.icons8.com/?size=1x&id=yGcWL8copNNQ&format=png';
    youtubelogo='https://img.icons8.com/?size=1x&id=9a46bTk3awwI&format=png';
    instagramlogo = 'https://img.icons8.com/?size=1x&id=Xy10Jcu1L2Su&format=png';
    
}