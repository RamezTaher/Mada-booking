import React from "react";
import format from "date-fns/format";
import { useTranslation } from "next-i18next";

const ReservationRules = (props: any) => {
    const { t } = useTranslation(["common"])

    const {
        rules
    } = props
    
    return (
        
        <div className="" >
        {
            rules?.map((rule, i) => { 
               return ( !rule?.FulFilled && <div key={i}  className="text-red-600">
                <bdi> {t('common:must_book')} {rule?.MinimumNights} {t('common:nights_at_least')} </bdi>
                <bdi> {t('common:from')} { format(new Date(rule?.StartDate), 'yyyy-MM-dd') } {t('common:to')} { format(new Date(rule?.EndDate), 'yyyy-MM-dd') } </bdi>
              </div> )
             } )
        }
        </div>
        )
    }
    
export default ReservationRules;
    