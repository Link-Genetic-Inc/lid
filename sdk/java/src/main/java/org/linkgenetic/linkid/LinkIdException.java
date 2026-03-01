package org.linkgenetic.linkid;

/**
 * Base exception for all LinkID client errors.
   */
public class LinkIdException extends Exception {

    public LinkIdException(String message) {
              super(message);
    }

    public LinkIdException(String message, Throwable cause) {
              super(message, cause);
    }

    public static class NotFound extends LinkIdException {
              private final String linkId;
              public NotFound(String linkId) {
                            super("LinkID not found: " + linkId);
                            this.linkId = linkId;
              }
              public String getLinkId() { return linkId; }
    }

    public static class ResolutionFailed extends LinkIdException {
              private final int statusCode;
              public ResolutionFailed(int statusCode, String message) {
                            super("Resolution failed (" + statusCode + "p)a:c k"a g+e  moersgs.algien)k;g
                              e n e t i c . l i n k i dt;h
                              i
                              s/.*s*t
                              a t*u sBCaosdee  e=x csetpattiuosnC ofdoer; 
      a l l   L i n k I}D
        c l i e n t   eprurbolrisc. 
      i n*t/ 
      gpeutbSltiact ucslCaosdse (L)i n{k IrdeEtxucrenp tsitoant uesxCtoedned;s  }E
      x c e p t}i
  o
  n   { 

  p u b l ipcu bsltiact iLci ncklIadsEsx cNeepttwioornk(ESrtrroirn ge xmteesnsdasg eL)i n{k
    I d E x c e p t isounp e{r
    ( m e s s a g e )p;u
    b l i c  }N
    e
    t w o r kpEurbrloirc( SLtirniknIgd Emxecsespatgieo,n (TShtrroiwnagb lmee scsaaugsee,)  T{h
    r o w a b l e   c a u s es)u p{e
    r ( " N e t w o rsku peerrr(omre:s s"a g+e ,m ecsasuasgee),; 
                                                                                             c a u s e})
                                                                                          ;

                                                                                                  p u b l i}c
      s t a t}i
    c
      c l a spsu bNloitcF osutnadt iecx tcelnadsss  LIinnvkaIldiEdxLcienpktIido ne x{t
    e n d s   L i n kpIrdiEvxacteep tfiionna l{ 
      S t r i n g   l ipnukbIldi;c
          I n v a l i d LpiunbklIidc( SNtortiFnogu nvda(lSuter)i n{g
          l i n k I d )   { 
            s u p e r ( " I n v asluipde rL(i"nLkiInDk:I D"  n+o tv aflouuen)d;:
                                                                     "   +   l i n k}I
        d ) ; 
                                                                  } 
  }         this.linkId = linkId;
    }
          public String getLinkId() { return linkId; }
}

    public static class ResolutionFailed extends LinkIdException {
              private final int statusCode;
              public ResolutionFailed(int statusCode, String message) {
                            super("Resolution failed (" + statusCode + "): " + message);
                            this.statusCode = statusCode;
              }
              public int getStatusCode() { return statusCode; }
    }

    public static class NetworkError extends LinkIdException {
              public NetworkError(String message, Throwable cause) {
                            super("Network error: " + message, cause);
              }
    }

    public static class InvalidLinkId extends LinkIdException {
              public InvalidLinkId(String value) {
                            super("Invalid LinkID: " + value);
              }
    }
}
